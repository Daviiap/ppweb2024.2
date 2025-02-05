-- Migration file created on 20250205132836
-- Migration file created on 20250205132836
CREATE TABLE IF NOT EXISTS person (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS organization (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS project (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    organization_id UUID NOT NULL REFERENCES organization(id)
);

CREATE TABLE IF NOT EXISTS person_organization (
    person_id UUID NOT NULL,
    organization_id UUID NOT NULL,
    PRIMARY KEY (person_id, organization_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (organization_id) REFERENCES organization(id),
    role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS person_project (
    person_id UUID NOT NULL,
    project_id UUID NOT NULL,
    PRIMARY KEY (person_id, project_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (project_id) REFERENCES project(id),
    role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS card (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    organization_id UUID NOT NULL REFERENCES organization(id),
    visibility VARCHAR(255) NOT NULL
);
