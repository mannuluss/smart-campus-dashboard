# Dashboard Smart Campus UIS

Front para el crear graficas estadisticas de los datos suministrados por dispositivos IOT conectados a la arquitectura de un campos universitario, para ser mas especifico al de Smart Campus IOT platform UIS.

# Dependencias

Se utilizo la version 18 de Nodejs.

Algunas dependencias como la de material angular se utiliza una version inferior a la de angular ya que material en la version
15 en adelante cambio su manera de como se llamaban los componentes. por lo tanto para instalarlas dependencias se utiliza el comando:

```{bash}
npm install --legacy-peer-deps
```

```{bash}
yarn install
```

## ANGULAR 16.1.7

se uso con scss dado que tengo buen manejo del mismo y tiene significativas ventajas con css, como el estar mas organizado y ser dinamico.

## ngx-colors
Se utiliza un input para la paleta de colores, que es una libreria que permite hacer todo el sistema de colores.

https://ngx-colors.web.app/overview

## APEXCHARTS

libreria utilizada para las graficas, que esta basada en chartjs pero que esta muy optimizada para angular y otros frameworks.

![image](https://github.com/projects-mannulus/smart-campus-dashboard/assets/49813014/2706bde2-c9de-42e0-9d22-4ee06d293b59)

https://www.npmjs.com/package/ng-apexcharts

## ngx-gridster
libreria que se usa para la grilla dinamica donde se agregan las plantillas de las graficas.

![image](https://github.com/projects-mannulus/smart-campus-dashboard/assets/49813014/e40d3443-00d1-4d1d-9c8f-6e76fb43b628)

https://automatica-core.github.io/ngx-gridster/

## NgxMatDatetimePickerModule
libreria para los datetime picker.

https://www.npmjs.com/package/@angular-material-components/datetime-picker


# DOCKER APP
Esta aplicacion tambien se dockerizo para futuros integraciones del proyecto en produccion. Para esto existen dos archivos para el docker (Dokerfile y DokerfilePipelines).

El primero "Dockerfile" es utilizado para copiar toda el contenido del repositorio en el contenedor para luego ser compilada la aplicacion angular y proveer la pagina utilizando nginx.

El segundo "DockerfilePipeline" es utilizado en el pipeline de Github Actions que se utilizo para desplegar la aplicacion en servidores; este archivo solo copia la carpeta "dist" ya generada al compilar angular y crea el servicio de nginx para proveer la aplicacion, esto la hace mas rapido su compilacion. Esto funciona solo si previamente ya se habia compilado la aplicacion angular (lo cual pasa en el pipeline cuando se compila y empaqueta para ser enviada al servidor).

https://hub.docker.com/repository/docker/mannulus/smartcampusdashboard/general

# AUTH USER
para el sistema de autenticacion se decidio cambiar el sistema que tenia la actual arquitectura e implementar un programa de terceros como keycloak.
## keycloak
guia de como se implemento

https://dev.to/anjnkmr/keycloak-integration-in-angular-application-5a43


https://www.adictosaltrabajo.com/2016/09/28/integracion-de-keycloak-con-angularjs-y-spring-boot/
