# Mobius

## 1. MariaDB 설치

```bash
sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
sudo add-apt-repository 'deb [arch=amd64,arm64,i386,ppc64el] http://ftp.cc.uoc.gr/mirrors/mariadb/repo/10.4/ubuntu xenial main'

sudo apt update
sudo apt install mariadb-server

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

## 2. Node.js 설치

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
nvm install node
npm -g install npm
```

## 3. Mobius 설치

```bash
git clone https://github.com/IoTKETI/Mobius
cd Mobius
npm install
```

## 4. 데이터베이스 설정

MariaDB를 사용한다면

```bash
$ vi mobius/sql_action.js
49 -- sql = util.format('set global transaction_isolation=\'READ-UNCOMMITTED\'');
49 ++ sql = util.format('SET GLOBAL TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');
```

```bash
$ vi conf.json
{
    "csebaseport": "7579",
    "dbpass": "<MySQL root password>"
}

$ vi mobius/mobiusdb.sql
CREATE DATABASE mobiusdb;
USE mobiusdb;

$ mysql -uroot -p < mobius/mobiusdb.sql
Enter password:
```

## 5. Mobius 실행

클러스터 사용하지 않음

```bash
$ vi app.js
126 -- var use_clustering = 1;
126 ++ var use_clustering = 0;
```

```bash
node mobius.js
```

## 6. 테스트

다운로드 한 JSON 파일을 '포스트 맨'에 import

```bash
git clone https://github.com/IoTKETI/oneM2M-API-Testing.git
```

## 7. oneM2M 진행 순서

포스트 맨에서 아래와 같이 테스트

### 7.0 CSE(Common Services Entity) 확인

```text
GET cb 조회
    GET
        http://127.0.0.1:7579/Mobius
```

### 7.1 AE(Application Entity) 등록

```text
POST ae 생성
    POST
        http://127.0.0.1:7579/Mobius
    Body
    {
        "m2m:ae" : {
            "rn": "justin",
            "api": "0.2.481.2.0001.001.000111",
            "rr": true
        }
    }
```

### 7.2 컨테이너 생성

```text
POST cnt 생성
    POST
        http://127.0.0.1:7579/Mobius/justin
    Body
    {
        "m2m:cnt": {
            "rn": "ss"
        }
    }
```

### 7.3 컨테이너 인스턴스 생성

```text
POST cin 생성
    POST
        http://127.0.0.1:7579/Mobius/justin/ss
    Body
    {
        "m2m:cin": {
            "con": "123"
        }
    }
```

### 7.4 컨테이너 인스턴스 조회

```text
POST cin 조회
    GET
        http://127.0.0.1:7579/Mobius/justin/ss/la
```
