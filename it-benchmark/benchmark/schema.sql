CREATE TABLE `questions`
(
    `sect`     VARCHAR(25) NULL DEFAULT NULL,
    `question` TEXT        NULL DEFAULT NULL,
    `points`   TINYINT     NULL DEFAULT NULL,
    `count`    INT         NULL DEFAULT NULL
);

INSERT INTO `questions` (sect, `question`, `points`, `count`)
VALUES ('security',
        'Ik weet in welke cloud platformen en applicaties van derden mijn medewerkers zakelijke informatie opslaan',
        '10',
        '0');

truncate questions;

CREATE TABLE `it_benchmark`.`contact_info`
(
    `email`        TEXT,
    `first_name`   TEXT NULL DEFAULT NULL,
    `last_name`    TEXT NULL DEFAULT NULL,
    `company_name` TEXT NULL DEFAULT NULL
);

CREATE TABLE `it_benchmark`.`quiz_users`
(
    `count` INT NOT NULL
);

INSERT INTO `quiz_users` VALUES(0);

INSERT INTO `contact_info` (`email`, `first_name`, `last_name`, `company_name`)
VALUES ('test@hvdz.nl', 'Edd', 'Jannsen', 'Hart voor de Zaak');

truncate contact_info;