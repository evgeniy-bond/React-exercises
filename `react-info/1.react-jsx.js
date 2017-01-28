React {
    Обновляет только то, что необходимо
    только текстовый узел, чье содержание изменилось будет обновляться реакт DOM
}

JSX {
    
    это техника создания элементов и компонентов React

    const element = (
        <h1>
            Hello, {formatName(user)}!
        </h1>
    );


    писать можно с переносом строк
    вставить в JSX js или переменные - исользовать фигурные скобки

    внутри можно использовать выражения if, циклы, назначать переменные, возвращать из функций

    function getGreeting(user) {
        if (user) {
            return <h1>Hello, {formatName(user)}!</h1>;
        }
        return <h1>Hello, Stranger.</h1>;
    }
}


Определение атрибутов с JSX {

    для определния шаблонных строк используются кавычки
    const element = <div tabIndex="0"></div>;

    в атрибуте можно исользовать и фигурные скобки 
    const element = <img src={user.avatarUrl}></img>;
}

Определение дочерних модулей с JSX {

    если тег пустой его нужно закрыть />;

    JSX может содержать дочерние модули

    const element = (
        <div>
            <h1>Hello!</h1>
            <h2>Good to see you here.</h2>
        </div>
    );
    атрибуты пишутся кэмелкейсом
}

JSX представляет из себя объекты {
    const element = (
        <h1 className="greeting">Hello, world!</h1>
    );

    идентично

    const element = React.createElement(
        'h1',
        { className: 'greeting' },
        'Hello, world!'
    );
}


//рендеринг
ReactDOM.render(arg1, arg2) {

    arg1 - то, что вставляем:

    1) переменная .Был создан как const = (какая - то разметка)
    2) элемент.element = React.createElement(какая - то разметка)
    3) компонент(записывается как  < Имя класса />)  React.createElement({})
    4) обычный JSX
    5) JSX, в которой компонент или несколько компонентов

        * для отрисовки нескольких компонентов необходимо заворачивать  их в разметку,
            компонент должен выдавать один корневой элемент

    arg2 - DOM элемент.document.getElementById('content')
}


//переменная всегда находится в {}!!


