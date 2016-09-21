CREATE TABLE `intro_to_sql`.`players` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))

  INSERT INTO intro_to_sql.players (`id`, `name`)
    VALUES  (10,'Alice'),
            (11, 'Bob'),
            (12, 'Carly'),
            (13, 'Dan');
