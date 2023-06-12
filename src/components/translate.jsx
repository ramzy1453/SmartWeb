import { useIntl, FormattedMessage } from "react-intl";

export function T(id) {
  const intl = useIntl();
  return intl.formatMessage({ id });
}

export default function t(id) {
  return <FormattedMessage id={id} />;
}
