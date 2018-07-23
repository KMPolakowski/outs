DROP DATABASE IF EXISTS outs;
CREATE DATABASE outs;
USE outs;

CREATE TABLE u_users (
 
  u_id INT AUTO_INCREMENT,
  u_firstname VARCHAR(50) NOT NULL,
  u_lastname VARCHAR(50) NOT NULL,
  u_email VARCHAR(50) NOT NULL,
  u_password VARCHAR(200) NOT NULL,
  u_male BOOL  NOT NULL,
  u_online BOOL DEFAULT FALSE,

  PRIMARY KEY (u_id, u_email)
)
ENGINE = InnoDB;


CREATE TABLE f_friends (

	f_id1 INT,
    f_id2 INT
    
)
ENGINE = InnoDB;


CREATE TABLE m_messages (
	m_id INT AUTO_INCREMENT,
    f_id1 INT,
    f_id2 INT,
    m_t DATETIME,
    m_m VARCHAR(1000),
    
    PRIMARY KEY(m_id)
);

-- Trigger for inserting correct m_t needs to be implemented

CREATE TABLE new_messages(

    m_id INT AUTO_INCREMENT,
    f_id1 INT,
    f_id2 INT,
    m_m VARCHAR (1000),
    
    PRIMARY KEY(m_id)
);

CREATE TABLE r_requests (
	f_id1 INT,
    f_id2 INT,
	r_id INT AUTO_INCREMENT,
    PRIMARY KEY(r_id)
);
    

-- f_id1 is sender, f_id2 is recipient

SELECT * FROM r_requests;

SELECT * FROM u_users;


SELECT * FROM new_messages;


SELECT u_users.u_firstname, u_users.u_lastname, u_users.u_id, r_requests.r_id
FROM u_users
LEFT JOIN r_requests ON u_users.u_id = r_requests.f_id2
WHERE r_requests.f_id2 LIKE '2';


SELECT u_users.u_id, u_users.u_firstname, u_users.u_lastname
FROM u_users
WHERE CONCAT(u_users.u_firstname, ' ', u_users.u_lastname) LIKE '%a%'
AND u_id NOT LIKE '2'
AND u_id NOT IN (SELECT f_id1 FROM f_friends WHERE f_id2 LIKE '2');




SET SQL_SAFE_UPDATES = 0;
delete from m_messages;



INSERT IGNORE into r_requests (f_id1, f_id2)
VALUES ('$requestingUser','$requestedUser');


SELECT f_id1, f_id2, m_m, m_id FROM new_messages WHERE (f_id1 = '2' AND f_id2 = '1');

