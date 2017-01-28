// 1 вариант дочерний меняет родительский
//в компоненте NoteEditor находится ColorPicker, который меняет его цвет
// в ColorPicker задается события onClick={this.selectColor}

функция selectColor 
 1)меняет свое состояние 
 2) передает через this.props.onSelectColor(color) родителю нужное состояние
 3) в родителе при рендере задано кастомное событие onSelectColor={this.selectColor}
 4) через родительский метод selectColor меняется основное состояние цвета 

var NoteEditor = React.createClass({
    getInitialState() {
        return {
            text: '',
            color: 'orangered',
        };
    },

    selectColor: function (value) {
        this.setState({ color: value });
    },

    render: function () {
        return (
            <div className="app-menu">
                <ColorPicker onSelectColor={this.selectColor} />
            </div>
        );
    }
});

var ColorPicker = React.createClass({

    getInitialState: function () {
        return {
            color: 'orangered'
        }
    },

    selectColor(e) {
        if (e.target.dataset.value) {
            var color = e.target.dataset.value;
            this.props.onSelectColor(color);
            this.setState({
                color: color
            })
        }
    },

    render() {

        return (
            <div className="color-picker" onClick={this.selectColor}>
                <div
                    className={"color color-red " + (this.state.color == 'orangered' ? 'success' : '')}
                    data-value="orangered">
                </div>
            </div>
        )
    }
});

//2 вариант дочерние в неком родительском
аналогично первому варианту
компоненты разделены
//
родительский компонент своим меотдом изменил отображение компонентов и передал их в другой дочерний отфильтрованный список


//3 вариант отдельные компоненты в корневой директории
уже исользуется глобальная система событий типа redux-flux

