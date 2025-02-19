-- Migration file created on 20250219180328
INSERT INTO
    person (id, name, email, password)
VALUES
    (
        '7f111406-d724-47e3-b646-65dbb068eb07',
        'Davi Pontes',
        'davi@sapiens.com.br',
        '$argon2id$v=19$m=65536,t=3,p=4$+zMKrhenaZIMg01pNf4F4Q$6pscOSpiulnLV8/tx5yME4vs/uUZdNSKuyDsxJE3cx4'
    ),
    (
        '526a7008-f05d-4072-8c3b-6a1e4c20fef7',
        'Jade Castor',
        'jade@sapiens.com.br',
        '$argon2id$v=19$m=65536,t=3,p=4$zJ1H+u3LsA+v/NLASWYF3Q$oB+8fUBZXQ/auyr9cfCKlEyVWSK2N2mQsXYtvEGWQMc'
    );

INSERT INTO
    organization (id, name, description)
VALUES
    (
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'SapienS',
        'Empresa inovadora de tecnologia focada em criar soluções inteligentes que impulsionam a evolução humana.'
    );

INSERT INTO
    project (id, name, description, organization_id)
VALUES
    (
        '89d16c3f-6021-4307-8894-b715d8f22b3b',
        'EvolvE',
        'Um sistema de educação baseada em IA que personaliza conteúdos e métodos de ensino para cada usuário, ajudando alunos e profissionais a aprenderem de forma mais eficiente, acelerando sua evolução intelectual.',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572'
    ),
    (
        '5741192e-ac6b-4c92-98f5-c3b964ab1822',
        'Neuron',
        'Uma tecnologia que combina automação de processos com aprendizado de máquina, permitindo que empresas otimizem tarefas repetitivas e tomem decisões mais inteligentes com base em dados contextuais.',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572'
    ),
    (
        '093388f3-8733-4bf1-800e-8f7fded17509',
        'Echo',
        'Uma plataforma de comunicação baseada em processamento de linguagem natural que melhora a interação entre humanos e máquinas, tornando assistentes virtuais, chatbots e sistemas de voz mais intuitivos e eficientes.',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572'
    );

INSERT INTO
    card (id, name, image_url, organization_id, visibility)
VALUES
    (
        '5f3b0073-d8e2-455a-9a2d-c8931fa77129',
        'homo-sapiens',
        'https://sapiens.com/public/images/homo-sapiens',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'private'
    ),
    (
        '8e2063a5-c570-4174-9624-4f34ed2dda6c',
        'dna',
        'https://sapiens.com/public/images/dna',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'private'
    ),
    (
        'f4b74529-2c7b-463d-9c55-0d0f7b21fc04',
        'evolution',
        'https://sapiens.com/public/images/evolution',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'private'
    ),
    (
        'e2f55fb7-0fc8-4346-9b56-46d9c5724987',
        'cognition',
        'https://sapiens.com/public/images/cognition',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'private'
    );

INSERT INTO
    person_organization (person_id, organization_id, role)
VALUES
    (
        '7f111406-d724-47e3-b646-65dbb068eb07',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'owner'
    ),
    (
        '526a7008-f05d-4072-8c3b-6a1e4c20fef7',
        '0c7ef55d-72d5-46ea-a463-e4696c7fb572',
        'manager'
    ) ON CONFLICT (person_id, organization_id) DO
UPDATE
SET
    role = EXCLUDED.role;

INSERT INTO
    person_project (person_id, project_id, role)
VALUES
    (
        '7f111406-d724-47e3-b646-65dbb068eb07',
        '89d16c3f-6021-4307-8894-b715d8f22b3b',
        'manager'
    ),
    (
        '526a7008-f05d-4072-8c3b-6a1e4c20fef7',
        '89d16c3f-6021-4307-8894-b715d8f22b3b',
        'manager'
    );