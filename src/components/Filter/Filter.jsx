import propTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, handleChange }) => (
  <>
    <label className={css.filterLabel}>Find contacts by Name
      <input
        className={css.filterName}
        type="text"
        name="filter"
        placeholder="Enter name"
        value={filter}
        onChange={handleChange}
      />
    </label>
  </>
);

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};