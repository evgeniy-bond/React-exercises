У каждого компонента есть жизненый цикл.

    Существует 4 сценария {
    1) инициализация компонента
    2) изменение его параметров (props)
    3) изменение его состояния (state)
    4) удаление компонента
}

1)инициализация компонента {

    при первом рендере вызываются следующие методы {
        getDefaultProps //установка дефолтных свойств
        getInitialState  //установка дефолтных состояний
        componentWillMount  //вызывается перед первым рендером, стейт не менят, толку пока ноль
        render              //первый рендер
        componentDidMount   //на этом этапе задаются взаимодействовия с внешними апи
    }
}

2)изменение его параметров {
    componentWillReceiveProps   //вызывается при получении новых параметров в ссылке this.props будут старые параметры
    shouldComponentUpdate   //вызывается при изменении параметров возвращает true, если изменение должно вызывать перерисовку
    componentWillUpdate //содержит объекты с новыми параметрами и сост. state не менять
    render
    componentDidUpdate  //содержит обеъект с пред и тек параметрами

3) изменение состояния {
    //аналогично props
    shouldComponentUpdate
    componentWillUpdate
    render
    componentDidUpdate
}

4) удаление компонента {
    componentWillUnmount    //вызывается перед удалением
}

Методы жизненного цикла {

    //вызывается единожды при инициализации класса
    getDefaultProps: function() {
        return {
            name: '',
            age: 0
        };
    }

    //установка начального состояния
    getInitialState: function() {
        return {
            isOpened: true
        };
    }

    //метод вызывается перед первым рендером компонента. Вызов setstate здесь не вызовет дополнительного рендера
    componentWillMount: function() {
        // ...
    }

    //вызывается 1 раз сразу после renderа
    componentDidMount: function() {
        // компонент уже находится в DOM
        // здесь можно уже взаимодействовать с DOM напрямую
        // например, использовать jQuery или какие-то сторонние библиотеки
    }

    //вызывается каждый раз, когда компонент получает новые параметры
    componentWillReceiveProps: function(nextProps) {
        // в nextProps содержится объект с новыми параметрами
        // старые параметры можно получить использование this.props
        this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
    }

    //вызывается при изменении параметров или состояния. возвращает true, если изменение должно вызывать перерисовку или false
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.id !== this.props.id;
    }

    //вызывается перед вызовом метода render 
    componentWillUpdate: function(nextProps, nextState) {
        // в nextProps содержится объект с новыми параметрами
        // в nextState содержится объект с измененным состоянием
        setState здесь не использовать
    }

    //вызывается сразу после вызова render
    componentDidUpdate: function(prevProps, prevState) {
        // в prevProps содержится объект с предыдущими параметрами
        // в prevState содержится объект с состоянием до изменения
        // измененные параметры и состояние могут быть получены через this.props и this.state
    }

    //вызывается перед тем, как компонент будет удален из DOM
    componentWillUnmount: function() {
        // обычно, в данном методе происходит некая уборка за компонентом
        // остановка таймеров, удаление ссылок на DOM елементы и т.д.
    }

}

this.props.children {
    позволяет писать прямо в таком виде

        < Article author= "Vasya Pupkin" > Here is article itself </Article >

            внутри артикл нужно поставить this.props.children
}

inline стили {

    можно прописать в объекте.при рендере указать style= { divStyle }
}

атрибут ref {
    при прикреплении ref на компонент DOM, такой как тег < div /> вы получите DOM узел обратно; в то время как при при присоединении ref к составному компоненту такому как < MyComponent />, вы получете экземпляр React класса. 

}

