CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE comptes (
    id_compte INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(255) DEFAULT 0 NOT NULL,
    solde_init REAL DEFAULT 0 NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);


CREATE TABLE categories (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(255) NOT NULL,
    type CHAR CHECK(type IN ('r', 'd')) NOT NULL,
    montant_prevu REAL DEFAULT 0 NOT NULL,
    description TEXT,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE budget_du_mois_par_categories (
    id_categorie INTEGER,

    mois INTEGER,
    annee INTEGER,
    montant_prevu REAL DEFAULT 0 NOT NULL,
    commentaires VARCHAR(255),

    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie),
    PRIMARY KEY (id_categorie, mois, annee)
);

CREATE TABLE transactions (
    id_transaction INTEGER PRIMARY KEY AUTOINCREMENT,
    montant REAL NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    id_categorie INTEGER NOT NULL,
    id_mois INTEGER NOT NULL,
    id_annee INTEGER NOT NULL,
    id_compte INTEGER,
    FOREIGN KEY (id_compte) REFERENCES comptes(id_compte),
    FOREIGN KEY (id_categorie, id_mois, id_annee) REFERENCES budget_du_mois_par_categories(id_categorie, mois, annee)
 );

