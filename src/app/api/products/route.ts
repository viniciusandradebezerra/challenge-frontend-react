import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

let db: any = null;

export async function POST(req: Request) {
  try {
    if (!db) {
      db = await open({
        filename: "./products.db",
        driver: sqlite3.Database,
      });
    }

    const { name, description, price } = await req.json();

    if (!name || !description || !price) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await db.run(
      "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );

    return new NextResponse(
      JSON.stringify({ id: result.lastID, name, description }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: Request) {
  try {
    if (!db) {
      db = await open({
        filename: "./products.db",
        driver: sqlite3.Database,
      });
    }

    const { id, name, description, price } = await req.json();

    if (!id || !name || !description || !price) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await db.run(
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, id]
    );

    return new NextResponse(
      JSON.stringify({ message: "Product updated successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Product not found." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!db) {
      db = await open({
        filename: "./products.db",
        driver: sqlite3.Database,
      });
    }

    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const product = await db.get("SELECT * FROM products WHERE id = ?", [id]);
      if (product) {
        return new NextResponse(JSON.stringify({ product }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Product not found." }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      // Buscar todos os produtos
      const products = await db.all("SELECT * FROM products");
      return new NextResponse(JSON.stringify({ products }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!db) {
      db = await open({
        filename: "./products.db",
        driver: sqlite3.Database,
      });
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await db.run("DELETE FROM products WHERE id = ?", [id]);

    if (result.changes > 0) {
      return new NextResponse(
        JSON.stringify({ message: "Product deleted successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ error: "Product not found." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
