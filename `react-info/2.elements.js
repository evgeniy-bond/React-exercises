React элементы {
    элементы - объекты JavaScript, которые представляют HTML- элементы
    
    элементы React неизменны.После создания нельзя изменить его дочерние модули или атрибуты
}

Создать можно двумя способами {

    //jsx
    const element = (
        <h1 className="greeting">Hello, world!</h1>
    );
    // в таком случае можно указывать без круглых скобок

    идентично

    const element = React.createElement(
        'h1', 
        { className: 'greeting' }, 
        'Hello, world!' 
    );

    идентично

    React.createElement(
        type, - название DOM элемента
        [props], свойства (как атрибут HTML )
        [...children] - содержимое создаваемого элемента
    )
}

