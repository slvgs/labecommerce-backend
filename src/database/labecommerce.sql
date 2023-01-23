CREATE TABLE clientes(
    id INTEGER PRIMARY KEY UNIQUE NOT NULL ,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL);

SELECT * FROM clientes;

INSERT INTO clientes (id, email, password)
VALUES
(1, "gabriella@labenu.com", "astrodev"),
(2, "vitoria@labenu.com", "vitoria123"),
(3, "amandaB@labenu.com", "amanda123");

DROP TABLE clientes;

-------------------------------------------------------------------------------------------
--PRODUCTS:

CREATE TABLE products(
    id PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL);


SELECT * FROM products;

DROP TABLE products;

INSERT INTO products
VALUES
("p2088", "Rumikub", 250.00, "Tabuleiro"),
("p2089", "Call Of Duty - Para Pc", 150.00, "PC"),
("p2090", "The Sims 4", 155.00, "Console"),
("p2091", "War", 350.00, "Tabuleiro");


-----------------------------------------------------------------------------

SELECT * FROM products WHERE id = "p2088";

INSERT INTO clientes (id, email, password)
    VALUES(4, "maria@labenu.com", "maria123");

INSERT INTO products (id, name, price, category)
    VALUES("p2092", "The Last Of Us", 300.00, "PC/Console");

DELETE FROM products
WHERE id = "p2088";

DELETE FROM clientes 
WHERE id = 3;

UPDATE clientes
SET email = "gabriellasilverio@labenu.com"
WHERE id = 3;

UPDATE products
SET name = "Perfil"
WHERE id = "p2088";

----------------------colocar em ordem cresc e filtrar entre preços --------------------------

SELECT * FROM products
WHERE price > 100.00 ORDER BY price ASC ;


SELECT * FROM products WHERE price BETWEEN 200.00 AND 300.00;

-- ----------------------------------------------------------------------------------

--CRIAÇÃO DA TABELA PURCHASE


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT DATETIME,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES clientes(id)
);


DROP TABLE purchases;

SELECT * FROM purchases;

INSERT INTO purchases(id, total_price, paid, delivered_at, buyer_id)
    VALUES("C01", 155.00, 1,NULL, "1"),
    ("C02", 300.00, 0,NULL, "1" ),
    ("C03", 500.00, 0,NULL, "2" ),
    ("C04", 250.00, 0,NULL, "3" );

UPDATE purchases
SET delivered_at = datetime("now")
WHERE id="C01";



-- ---------- COM INNER JOIN estou JUNTANDO AMBAS TABELAS --------------------
SELECT
clientes.id as clienteID,
clientes.email, 
clientes.password,
purchases.*
FROM clientes
INNER JOIN purchases
ON purchases.buyer_id = clientes.id;


-- Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

CREATE TABLE purchases_products
(purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantify INTEGER NOT NULL, 
Foreign Key (purchase_id) REFERENCES purchases(id),
Foreign Key (product_id) REFERENCES products(id));


SELECT * FROM purchases_products;

--Popule sua tabela simulando 3 compras

INSERT INTO purchases_products(purchase_id, product_id, quantify)
VALUES("C01", "P2088", 3), ("C02", "P2089", 1), ("C03", "P2090", 5);


SELECT
purchases.id AS purchaseID,
products.id AS productsID,
products.name AS productName, 
purchases_products.quantify,
purchases.buyer_id,
purchases.total_price
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;



