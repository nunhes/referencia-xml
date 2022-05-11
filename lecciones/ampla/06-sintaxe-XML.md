# Sintaxe XML

1. O elemento raíz é obrigatorio en XML
O documento XML debe ter un elemento raíz. Un elemento raíz pode ter elementos fillos e elementos secundarios.

Por exemplo: no seguinte documento XML, <message>é o elemento raíz e <to>, <from>, <subject>e <text>son elementos fillos.

<? xml version = "1.0" encoding = "UTF-8" ?> <message> <to> Steve </to> <from> Paul </from> <subject> Mensaxe do profesor ao alumno </subject> <text> Vostede tes un exame mañá ás 9:00 </text> </message>

   
   
   
   
O seguinte documento XML é incorrecto porque non ten un elemento raíz.

<? xml version = "1.0" encoding = "UTF-8" ?> <to> Steve </to> <from> Paul </from> <subject> Mensaxe do profesor ao estudante </subject> <text> Tes un exame mañá ás 9:00 h </text>



2. XML distingue entre maiúsculas e minúsculas
XML é unha linguaxe que distingue entre maiúsculas e minúsculas.

Por exemplo:
Isto é válido

<de> Paul </de>
Isto non é válido
A primeira letra da etiqueta de peche está en maiúscula mentres que a primeira letra da etiqueta de apertura está en pequena, este é un exemplo de XML non válido.

<de> Paul </De>
3. Prólogo XML
<? versión xml = codificación "1.0" = "UTF-8" ?>
Esta liña chámase XML Prolog. É unha liña opcional, pero debería ser a primeira liña cando a menciones. Especifica a versión XML e a codificación utilizada no documento XML.

4. Os elementos non deben superpoñerse
Todos os elementos en XML deben estar aniñados correctamente e non deben superpoñerse.

<class><teacher> Rick </class></teacher>   -->Incorrecto (non aniñado correctamente)
 <class><teacher> Rick </teacher></class>   -->Correcto (aniñado correctamente)
5. Atributos en XML
Máis adiante comentaremos os atributos XML en detalle. De momento, vexamos a sintaxe dos atributos. Unha etiqueta de apertura en XML pode ter atributos, estes atributos son pares nome e valor.

Os nomes dos atributos distinguen entre maiúsculas e minúsculas e non deben estar entre comiñas .
Os valores dos atributos deben estar entre comiñas simples ou dobres .

<text category = "message" > Tes un exame mañá ás 9:00 horas </text>   
Aquí categoryestá o nome do atributo e messageo valor do atributo.

Tomemos algúns exemplos máis para ver casos de atributos válidos e non válidos.
Unha etiqueta pode ter máis dunha parella nome e valor, pero dous nomes de atributos non poden ser iguais (consulte o punto 5 no seguinte exemplo)

1. < text category = message > ola </ text > --> incorrecto
 2. < text "category" = message > ola </ text > --> incorrecto
 3. < text category = "message" > ola </ text > --> correcto
 4. < text category = "message" purpose = "saúdo" > ola </ texto >                --> correcto
 5. < text category = "message" category = "saúdo" > ola </ text > --> incorrecto    
6. Os elementos XML deben ter unha etiqueta de peche
Todos os documentos XML deben ter unha etiqueta de peche.

<text category = message > ola </text>   -->correcto
 <text category = message > ola -->erróneo      
7. Comentarios en XML
Así debe ser un comentario nun documento XML.

<!-- Isto é só un comentario -->
8. Os espazos en branco consérvanse en XML
A diferenza do HTML que non conserva espazos en branco, o documento XML conserva os espazos en branco.