//пример на JSX
function Hero(props) {
    return (
        <div className="container">
            <img src={props.imageUrl} />
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
        </div>
    );
}
ReactDOM.render(
    <div>
        <Hero title="React"
            subtitle="Библиотека для создания пользовательских интерфейсов"
            imageUrl="https://facebook.github.io/react/img/logo.svg" />
        <Hero title="Angular 2"
            subtitle="Один фреймворк"
            imageUrl="https://angular.io/resources/images/logos/angular2/angular.svg" />
    </div>,
    document.getElementById('root'));

параметры записываются в объект props, он передается в функцию, и дальше расходится по составлюящим.свойсва нужно заворачивать в фигурные скобки без ковычек

//пример без JSX
function Hero(props) {
    return (
        React.createElement('div', { className: 'container' },
            React.createElement('img', { src: props.imageUrl }),
            React.createElement('h1', null, props.title),
            React.createElement('p', null, props.subtitle)
        )
    );
}
var hero = React.createElement(Hero, {
    title: 'React',
    subtitle: 'Библиотека для создания пользовательских интерфейсов',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
});

ReactDOM.render(hero, document.getElementById('root'));

//пример на классах
class Article extends React.Component {

    static get propTypes() {
        return {
            data: React.PropTypes.shape({
                author: React.PropTypes.string.isRequired,
                text: React.PropTypes.string.isRequired,
                bigText: React.PropTypes.string.isRequired
            })
        }
    };

    // установка значений по умолчанию
    теперь, обращаясь к this.props.data значением по умолчанию , data


// если нужно отправить два компонента, то в рендере оборачиваются тегом, а теги меняются

для того, чтобы передать объект или массив его надо записать в переменую 
в компоненте его выдеить и уже тогда использовать значения


//в качестве проверки входных свойств на тип данных можно воспользоваться свойством propTypes и записать типы данных входных параметров 

React.propTypes {
    специальное свойство, которое будет "валидировать" наш компонент.
        React.createClass({
            propTypes: {
                // Вы можете указать, каким примитивом должно быть свойство
                optionalArray: React.PropTypes.array,
                optionalBool: React.PropTypes.bool,
                optionalFunc: React.PropTypes.func,
                optionalNumber: React.PropTypes.number,
                optionalObject: React.PropTypes.object,

                и на выбор устанавливаем  какой тип  данных будет на входе
            }
        })
}

