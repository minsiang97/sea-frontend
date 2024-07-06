import moment from 'moment';

export const parseDate = (date: string, format: string) => {
  return moment(date).format(format);
};
