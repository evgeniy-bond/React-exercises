Атрибут ref принимает функцию обратного вызова, и вызывает ее после того, как компонент монтируется в DOM или удаляется из него.

функция принимает базовый элемент DOM в качестве аргумента

устанавливаем фокус

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Установка фокуса на поле текстового ввода (input) с явным использованием исходного API DOM
    this.textInput.focus();
  }

  render() {
    // Использование обратного вызова `ref` для сохранения ссылки на поле текстового ввода (input)
    // как элемента DOM в this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}