import './input.scss';

const Input = ({
  element = 'input',
  type = 'text',
  label,
  value,
  onChange,
  name,
}) => {
  switch (element) {
    case 'input':
      return (
        <div className='app-input-group'>
          <label>{label}</label>
          <input type={type} name={name} value={value} onChange={onChange} />
        </div>
      );

    case 'textarea':
      return (
        <div className='app-input-group'>
          <label>{label}</label>
          <textarea type={type} name={name} value={value} onChange={onChange} />
        </div>
      );

    default:
      break;
  }
};

export default Input;
