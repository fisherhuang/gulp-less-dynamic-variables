
# gulp-less-dynamic-variables
dynamic variables for less

we cae use this package to dynamic add less variables


<pre>
<code>
var dynamicVar = require('./gulp-less-dynamic-variables');
    
var themes = ["test1", "test2"];

themes.forEach((name, index) => {
    gulp.task(name, () => {
        return gulp.src([
            basePath + 'less/header.less',
            basePath + 'less/index.less'
        ]).pipe(
            dynamicVar({
            variableContent: './Templates/data/less.json',
            variableType: 'stringfile', //'lessfile|stringfile|stringcontent',
            variableKey: name,
            isJosnData: true
        })
        )
        .pipe(less({
            compress: false
        }))
        .pipe(concat('theme.css'))
        .pipe(gulp.dest(destPath + 'src/theme/' + name + ''));
        });
});
</code>
</pre>
<ol>
    <li>variableContent: is the content of variables, we can use file or content</li>
    <li>variableType: 
            <p>stringfile - json data or string data</p>
            <p>stringcontent - the string content </p>                 
             <p>lessfile - normal less variable file</p>    
    </li>
    <li>variableKey: just apply by json data</li>
    <li>isJsonData: jsut make the code know the stringfile content is a json data or a normal string data</li>
</ol>



