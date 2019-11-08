# mailserver
Set up your own mailserver, to send, recieve and forward mails.

## Preparation
In general, TLL values of 5 Min. (300 sec) are recommended.

Any additional info that could be helpful, is given in the *INFO* column (not part of the DNS record). 

Make sure you have the following DNS records available:

|Name|Type|Value|INFO|
|---|---|---|---|
|@|A|\<your ipv4 adress\>|
|@|AAAA|\<your ipv6 adress\>|
|@|MX|10 @|
|@|TXT|v=spf1 mx a -all|Accepts mail from matching MX and A record, while blocking other mails|
|api.mailserver|CNAME|@|API for mailserver|
|mail|MX|10 @|
|mailserver|CNAME|@|mailserver subdomain|
|_dmarc|TXT|v=DMARC1; p=quarantine; pct=20; aspf=r; adkim=r;|DMARC policy (See: https://dmarc.org/overview/)|





## Installation (Ubuntu 18.04 LTS)

### Variables
Before installing anything, set the following environment variables:

    export FLASK_APP=run.py
    export MAILSERVER_DOMAIN="example.com"
    export MAILSERVER_MAILUSER_PASSWORD=$(python3 -c "import uuid; print(uuid.uuid4().hex)")
    export MAILSERVER_SECRET_KEY=$(python3 -c "import uuid; print(uuid.uuid4().hex)")


### Base items
To install all the base dependencies and the mailserver repository, run the `install_base` script.

    source scripts/install_base

### Backend
To install all the base dependencies and the mailserver repository, run the `install_backend` script.

    source scripts/install_backend

### Frontend
To install all the base dependencies and the mailserver repository, run the `install_frontend` script.

    source scripts/install_frontend

### Postfix, Dovecot, DKIM
To install Postfix, Dovecot and DKIM, run following scripts in order:

Postfix
    
    source scripts/postfix

Dovecot

    source scripts/dovecot

DKIM

    source scripts/dkim

When the `dkim` script is done, open the file containing the DKIM key:

    sudo nano -$ /etc/opendkim/keys/$MAILSERVER_DOMAIN/mail.txt

Copy this value into your DNS records.

|Name|Type|Value|
|---|---|---|
|mail._domainkey|TXT|v=DKIM1; h=sha256; k=rsa; p=<loooooong_string>|

### Backups
Look up the environment variables with the `env` command and copy the `MAILSERVER_MAILUSER_PASSWORD`

Run the following command, and paste the password when promted:

    sudo mysql_config_editor set --login-path=mailserver --host=localhost --user=mailuser --password

When prompted, paste the database password, and press ENTER.

Next, create the backup directory, and give the right permissions.

    sudo mkdir backups
    sudo chmod 777 backups

Now that there is a folder for the backups to be stored, copy the backup script, and give the copied file the right permissions, so that it can be executed through a cronjob.

    sudo cp scripts/backup cron/backup
    sudo chmod 775 cron/backup

Finally, set a cronjob for the weekly backups. Open the crontab:

    crontab -e

Append the following to the file:

    MAILTO=""
    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
    
    @weekly ~/galacursussen/scripts/cron_backup

The database will now be updated weekly.
