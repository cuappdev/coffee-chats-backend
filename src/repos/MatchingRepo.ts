import { getConnectionManager, Repository } from 'typeorm';
import Matching from '../entities/Matching';
import Time from '../entities/Time';
import User from '../entities/User';
import DaySchedule from '../entities/DaySchedule';

const matchingDB = (): Repository<Matching> => getConnectionManager().get().getRepository(Matching);
const dayScheduleDB = (): Repository<DaySchedule> => getConnectionManager().get().getRepository(DaySchedule);
const timeDB = (): Repository<Time> => getConnectionManager().get().getRepository(Time);

const createTime = async (
  time: number
): Promise<void> => {

  const possible_time = await timeDB().findOne({ time });
  if (possible_time == null) {
    const time_obj = timeDB().create({
      time
    });
    await timeDB().save(time_obj);
  }
};

const createDaySchedule = async (
  day: string,
  times: [number]
): Promise<DaySchedule> => {
  const daySchedule = dayScheduleDB().create({ day });
  const callback = (accum, currentVal) => {
    accum.push(new Time(currentVal));
    return accum
  }
  daySchedule.times = times.reduce(callback, []);
  await dayScheduleDB().save(daySchedule);
  return daySchedule;
}

const createMatching = async (
  users: User[],
  schedule: DaySchedule[]
): Promise<Matching> => {
  const matching = matchingDB().create({
    users,
    schedule
  });
  await matchingDB().save(matching);
  return matching;
}


export default {
  createDaySchedule,
  createMatching,
  createTime,
};