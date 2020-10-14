# Mobius

## 1. MariaDB 설치

```bash
sudo apt-get install -y software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
sudo add-apt-repository "deb [arch=amd64,arm64,ppc64el] http://ftp.cc.uoc.gr/mirrors/mariadb/repo/10.4/ubuntu $(lsb_release -cs) main"

sudo apt update
sudo apt install -y mariadb-server

sudo mysql_secure_installation
Enter current password for root (enter for none): enter
Switch to unix_socket authentication [Y/n] n
Change the root password? [Y/n] Y
New password:
Re-enter new password:
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y
```

## 2. MQTT 설치

```bash
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

## 3. Node.js 설치

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
nvm install node7
npm -g install npm
```

## 4. Mobius 설치

```bash
git clone https://github.com/IoTKETI/Mobius
cd Mobius
npm install
```

## 5. 데이터베이스 설정

MariaDB를 사용한다면

```bash
$ vi mobius/sql_action.js
51 -- sql = util.format('set global transaction_isolation=\'READ-UNCOMMITTED\'');
51 ++ sql = util.format('SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
```

```bash
$ vi conf.json
{
    "csebaseport": "7579",
    "dbpass": "<MariaDB root password>"
}

$ vi mobius/mobiusdb.sql
CREATE DATABASE mobiusdb;
USE mobiusdb;

$ mysql -uroot -p < mobius/mobiusdb.sql
Enter password:
```

## 6. Mobius 실행

```bash
node mobius.js
```
