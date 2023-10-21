Certainly, I've reformatted your readme file and added the basics of Redis commands:

# Redis Setup and Basic Commands


## Installation

### Install WSL (Windows Subsystem for Linux)

```bash
wsl --install
```

### Install Redis on WSL

```bash
sudo apt install lsb-release
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

### Start Redis Server

```bash
$ redis-cli
127.0.0.1:6379> CONFIG GET protected*
(empty list or set)
127.0.0.1:6379> CONFIG SET protected-mode no
```

**Important Note:** You may need to edit the Redis configuration file.

1. Open the Redis configuration file:

```bash
sudo vi /etc/redis/redis.conf
```

2. Comment out the line `bind 127.0.0.1 ::1`:

```
# bind 127.0.0.1 ::1
```

3. Comment out the line `protected-mode yes` and change it to `protected-mode no`:

```
protected-mode no
```

4. Start the Redis service:

```bash
sudo service redis-server start
```

**Note:** Editing the Redis configuration file is usually sufficient, and you may not need to execute these commands.

For more details, refer to: [How to turn off protected mode in Redis](https://serverfault.com/questions/861519/how-to-turn-off-protected-mode-in-redis)

## Find Your IP in WSL

To find your IP in the Windows Subsystem for Linux (WSL), use the following command:

```bash
$ ifconfig
```

## Install Redis CLI on Windows

To install the Redis CLI on Windows, you can use the following command:

```bash
npm install -g redis-cli
```

## Connect with CMD

```bash
rdcli -h 127.0.0.1
```
Now you're set up with Redis and can start using Redis commands for your data storage and retrieval needs.