CREATE TABLE `intro_to_sql`.`clans` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

INSERT INTO `intro_to_sql`.`clans`
  (id, name)
  VALUES
    ( 20, 'Iron Rockstars' ),
    ( 21, '24k Ninjas' );
