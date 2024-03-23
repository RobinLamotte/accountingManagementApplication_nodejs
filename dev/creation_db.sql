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

CREATE TABLE budgets (
    mois INTEGER,
    annee INTEGER,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    PRIMARY KEY (mois, annee)
);

CREATE TABLE categories (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(255) NOT NULL,
    type CHAR CHECK(type IN ('r', 'd')) NOT NULL,
    montant_prevu REAL DEFAULT 0 NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE prevision_budget_par_categories (
    id_categorie INTEGER,
    mois INTEGER,
    annee INTEGER,

    montant_prevu REAL DEFAULT 0 NOT NULL,
    commentaires VARCHAR(255),

    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie),
    FOREIGN KEY (mois, annee) REFERENCES budgets(mois, annee),
    PRIMARY KEY (id_categorie, mois, annee)
);

CREATE TABLE transactions (
    id_transaction INTEGER PRIMARY KEY AUTOINCREMENT,
    montant REAL NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    id_prevision_categorie INTEGER NOT NULL,
    id_prevision_mois INTEGER NOT NULL,
    id_prevision_annee INTEGER NOT NULL,
    id_compte INTEGER,
    FOREIGN KEY (id_compte) REFERENCES comptes(id_compte),
    FOREIGN KEY (id_prevision_categorie, id_prevision_mois, id_prevision_annee) REFERENCES prevision_budget_par_categories(id_categorie, mois, annee)
 );


INSERT INTO users (nom, prenom, email, password) VALUES ('Lamotte', 'Robin', 'r.l@h.com', 'test');
INSERT INTO comptes (nom, solde_init, id_user) VALUES ('Belfius', 1000, 1);
INSERT INTO categories (nom, type, montant_prevu, id_user) VALUES ('Alimentation', 'd', 200, 1);
INSERT INTO budgets (mois, annee, id_user) VALUES (3, 2024, 1);
INSERT INTO prevision_budget_par_categories (id_categorie, mois, annee, montant_prevu, commentaires) VALUES (1, 3, 2024, 200, null);
INSERT INTO transactions (montant, description, date, id_prevision_categorie, id_prevision_mois, id_prevision_annee, id_compte) VALUES (58, 'courses semaine 2', '2024-03-12', 1, 3, 2024, 1);