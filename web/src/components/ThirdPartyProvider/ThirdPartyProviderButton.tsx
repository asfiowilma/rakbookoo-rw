export default ({ provider, ...rest }) => {
  const { logo, value, disabled } = provider

  return (
    <button
      {...rest}
      disabled={disabled}
      title={value}
      value={value}
      className="btn btn-sm gap-2"
    >
      {logo} <span>{value}</span>
    </button>
  )
}
