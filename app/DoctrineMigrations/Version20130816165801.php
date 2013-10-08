<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration,
    Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your need!
 */
class Version20130816165801 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSQL("
            ALTER TABLE  `navigation` CHANGE  `isOpen`  `isOpen` TINYINT( 2 ) NOT NULL DEFAULT  '1' COMMENT  '默认1，为开启';
        ");
        $this->addSQL("
            ALTER TABLE  `navigation` CHANGE  `isNewWin`  `isNewWin` TINYINT( 2 ) NOT NULL DEFAULT  '1' COMMENT  '默认为1,另开窗口';
        ");
    }

    public function down(Schema $schema)
    {
        // this down() migration is autogenerated, please modify it to your needs

    }
}
