import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a MySQL connection pool with the correct port
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST, // hostname
  user: process.env.MYSQL_USER, // username
  password: process.env.MYSQL_PASSWORD, // password
  database: process.env.MYSQL_DATABASE, // database name
  port: process.env.MYSQL_PORT, // port
});

// Connecting to the database
connection.getConnection((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// For getting deadstock through lab_id, cat_id, unit_id
export async function getDeadStock(lab_id, cat_id, unit_id) {
  try {
    const [rows] = await connection.query(
      `
      SELECT
        p.category_id, 
        p.unit_id, 
        p.description, 
        s.shop_name, 
        s.address, 
        p.unit_price, 
        p.tax, 
        p.purchase_date, 
        p.warranty
      FROM 
        products p
      JOIN 
        orders o ON p.purchase_date = o.order_date
      JOIN 
        supplier s ON o.GSTIN = s.GSTIN
      WHERE 
        p.lab_id = ? 
        AND p.category_id = ?
        AND p.unit_id = ?;
      `,
      [lab_id, cat_id, unit_id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching dead stock:", error);
    throw error;
  }
}

// For getting history card through lab_id, cat_id, unit_id
export async function getHistoryCard(lab_id, cat_id, unit_id) {
  try {
    const [rows] = await connection.query(
      `
      SELECT 
        p.category_id, 
        p.unit_id, 
        hc.problem_id, 
        hc.problem_description, 
        hc.report_date,
        hc.remedy_taken,
        hc.work_completion_date
      FROM 
        history_card hc
      JOIN 
        have h ON hc.problem_id = h.problem_id
      JOIN 
        products p ON h.category_id = p.category_id 
        AND h.unit_id = p.unit_id 
      WHERE 
        p.lab_id = ?
        AND p.category_id = ?
        AND p.unit_id = ?;
      `,
      [lab_id, cat_id, unit_id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching history card:", error);
    throw error;
  }
}

// Update deadstock description
export async function updateDeadStock(lab_id, cat_id, unit_id, new_description) {
  try {
    await connection.query(
      `
      UPDATE products
      SET description = ?
      WHERE lab_id = ? 
        AND category_id = ?
        AND unit_id = ?;
      `,
      [new_description, lab_id, cat_id, unit_id]
    );
    const row = await getDeadStock(lab_id, cat_id, unit_id);
    return row;
  } catch (error) {
    console.error("Error updating dead stock:", error);
    throw error;
  }
}

// Update history card
export async function updateHistoryCard(
  lab_id,
  cat_id,
  unit_id,
  problem_id,
  remedy_taken,
  work_completion_date
) {
  try {
    await connection.query(
      `
      UPDATE history_card
      SET remedy_taken = ?, work_completion_date=?
      WHERE problem_id = ?;
      `,
      [remedy_taken, work_completion_date, problem_id]
    );
    const row = await getHistoryCard(lab_id, cat_id, unit_id);
    return row;
  } catch (error) {
    console.error("Error updating history card:", error);
    throw error;
  }
}

// Insert problem in specific product
export async function insertProblem(
  lab_id,
  category_id,
  unit_id,
  problem_id,
  problem_description,
  report_date,
  remedy_taken,
  work_completion_date
) {
  try {
    await connection.query(
      `
      INSERT INTO history_card (problem_id, problem_description, report_date, remedy_taken, work_completion_date)
      VALUES (?, ?, ?, ?, ?);
      `,
      [
        problem_id,
        problem_description,
        report_date,
        remedy_taken,
        work_completion_date,
      ]
    );

    await connection.query(
      `
      INSERT INTO have (problem_id, category_id, unit_id)
      SELECT ?, category_id, unit_id
      FROM products
      WHERE lab_id = ? AND category_id = ? AND unit_id = ?;
      `,
      [problem_id, lab_id, category_id, unit_id]
    );
    const row = await getHistoryCard(lab_id, category_id, unit_id);
    return row;
  } catch (error) {
    console.error("Error inserting problem:", error);
    throw error;
  }
}
