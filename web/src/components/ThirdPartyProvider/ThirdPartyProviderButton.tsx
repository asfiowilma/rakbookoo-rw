export default ({ provider, ...rest }) => {
  const { logo, value, label, disabled } = provider

  const buttonClasses = 'p-2 border border-red-300 rounded-md flex justify-center items-center'

  return (
    <button
      {...rest}
      disabled={disabled}
      title={label}
      value={value}
      className={buttonClasses}
    >
      <img
        src={logo}
        style={{
          maxWidth: '25px',
        }}
        alt={label}
      />
    </button>
  )
}
