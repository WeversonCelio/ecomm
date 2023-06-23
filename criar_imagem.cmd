echo "criando a imagem"
@REM docker build -t weversoncelio/ecomm:1.0 . 
docker build -t weversoncelio/ecomm:1.1 --build-arg PORT_BUILD=3000 .
pause 

