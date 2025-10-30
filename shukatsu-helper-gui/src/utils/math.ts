export const swap = <T>(x:T, y:T):void => {
  [x, y] = [y, x];
}
export const getRandomInt = (min:number, max:number):number => {
  if(min>max)  swap(min, max);
  return Math.floor(Math.random()*(max-min+1))+min;
} 