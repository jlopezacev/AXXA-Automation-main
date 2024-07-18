enableProxy(){
  export http_proxy=http://vipprseagoes.axa-seguros-es.intraxa:8080
  export https_proxy=http://vipprseagoes.axa-seguros-es.intraxa:8080
  export HTTP_PROXY=http://vipprseagoes.axa-seguros-es.intraxa:8080
  export HTTPS_PROXY=http://vipprseagoes.axa-seguros-es.intraxa:8080
  export no_proxy=".axa-cloud.com,localhost,127.0.0.1"
  export NO_PROXY=".axa-cloud.com,localhost,127.0.0.1.axa-cloud.com"
}
 
disableProxy(){
  export http_proxy=""
  export https_proxy=""
  export HTTP_PROXY=""
  export HTTPS_PROXY=""
  export no_proxy=""
  export NO_PROXY=""
}
export PATH=/usr/local/bin:$PATH