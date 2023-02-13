import propTypes from 'prop-types';
import { ImpytStyle, TextSpan, FiltrBox } from './Filter.styles';
export const Filter = ({ onChangeValue, value }) => {
  // const onChange = e => {
  //   const value = e.target.value.trim().toLowerCase();
  //   onChangeValue(value);
  // };
  return (
    <>
      <FiltrBox>
        <TextSpan>Find contacts by name</TextSpan>
        <div>
          <ImpytStyle
            value={value}
            onChange={onChangeValue}
            type="text"
            name="name"
            placeholder="Search"
          />
        </div>
      </FiltrBox>
    </>
  );
};
Filter.propTypes = {
  value: propTypes.string.isRequired,
  onChangeValue: propTypes.func.isRequired,
};
