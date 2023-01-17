# AntonioOrquest

Este proyecto ha sido generado con [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Requerimientos

Este proyecto es una demo para un restaurante, en el que el dueño necesita consultar los fichajes de los empleados. Tiene varias necesidades:

- Conocer el número de horas que han trabajado los empleados durante una semana y cada día, descontando los descansos
- Ver el detalle de los fichajes, incluyendo horas de entrada, salida y descansos
  - Para que un fichaje esté completo, debe tener un inicio y un final, igual que su descanso, si es que lo hubiese
  - Si un fichaje está incompleto, no contabiliza en las horas fichadas
- Comprobar a simple vista si hay algún fichaje incompleto, o alguna de las restricciones se incumplen
  - Las restricciones son: máximo de minutos trabajados en un día y una hora mínima de entrada
  - Las restricciones varían cada día de la semana

## Ambigüedades

Algunos puntos pueden considerarse ambiguos o confusos:

- No hay ninguna API que devuelva los fichajes de todos los empleados al mismo tiempo, así que he optado por mostrar solo los de un empleado al mismo tiempo, seleccionando el empleado con antelación, ya que encolar varias llamadas de APIs puede dar una mala experiencia, aunque para esta demo solo hubiese 3 empleados
- La API que devuelve los fichajes, los está devolviendo por duplicado. Por ejemplo para un mismo día devuelve los siguientes tramos: 09:00 - 14:30, 16:00 - 19:00, 09:00 - 14:30(repetido) y 16:00 - 19:00(repetido). He optado por dejarlos tal cuál están, aunque den el doble de horas fichadas, ya que me parece que sería hacer una chapuza hacer esta tarea
- También he optado por mostrar todos los días de la semana en la tabla de fichajes, aunque esos días no se hayan trabajado, ya que creo que así es más sencillo visualizar la semana completa

## Instalación

Para ejecutar este proyecto, se necesita tener instalado:

- Node.js 16 (https://nodejs.org/es/)
- Angular 15 (https://angular.io/guide/setup-local)

```
npm install -g @angular/cli
```

## Get started

Una vez descargado el proyecto, instalamos las dependencias con npm, situándonos en la carpeta raíz del proyecto

```
npm install
```

Ya podemos ejecutar el proyecto con el siguiente comando

```
npm start
```

El proyecto debería estar levantado en la url `http://localhost:4200/`

## Como funciona

Al entrar tenemos un filtro en la parte superior, con:

- Un selector de empleados, para seleccionar el que queramos ver
- Un indicador de la semana filtrada, con botones para cambiar entre la semana anterior y la siguiente. La semana que aparece por defecto es la actual

Cuando tenemos los filtros elegidos, aparece la tabla con la información del empleado en la semana filtrados. En la parte superior de la tabla vemos las horas totales trabajadas de esa semana. En la propia tabla podemos ver:

- El día
- Las horas fichadas del día
- Un detalle con las restricciones incumplidas, y los tramos fichados
- El estado, nos indica si el fichaje está completo o incompleto

## Lint

Para ejecutar eslint en el proyecto, lo hacemos con el siguiente comando

```
npm run lint
```

## Tests

Para ejecutar los tests unitarios del proyecto, ejecutamos el siguiente comando

```
npm run test
```

La mayoría de tests están en el archivo `employees-schedule-utils.service.spec.ts`
