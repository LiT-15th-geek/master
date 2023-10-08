type DiffHour = {
  date: string;
  hours: number[];
};

// 開始日と終了日の間の日付を配列で返す
export const getDates = (term_start_day: string, term_end_day: string) => {
  // 開始日と終了日を文字列からDateオブジェクトに変換
  const startDate = new Date(term_start_day);
  const endDate = new Date(term_end_day);

  // 開始日から終了日までの日付を生成
  const dateArray = [];

  while (startDate <= endDate) {
    dateArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dateArray;
};

// 2つの日付の差分を１時間単位で求める
export const getDiffHour = (start_time: string, end_time: string) => {
  // 開始日時と終了日時をDateオブジェクトに変換
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);

  // 結果を格納するための配列
  const result: DiffHour[] = [];

  // 開始日時から終了日時までの日付と時間を生成
  while (startTime <= endTime) {
    const date = startTime.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    const hour = startTime.getHours();

    // 日付がresultに存在するか確認し、存在しない場合は新しいオブジェクトを作成
    let dateEntry = result.find((item) => item.date === date);
    if (!dateEntry) {
      dateEntry = { date: date, hours: [] };
      result.push(dateEntry);
    }

    // 時間をhoursプロパティに追加
    dateEntry.hours.push(hour);

    // 1時間進める
    startTime.setHours(startTime.getHours() + 1);
  }

  return result;
};

export const mergeObjectsByDate = (input: DiffHour[]): DiffHour[] => {
  const mergedMap = new Map<string, DiffHour>();

  for (const item of input) {
    if (mergedMap.has(item.date)) {
      const existingData = mergedMap.get(item.date)!;
      const uniqueHours = Array.from(
        new Set([...existingData.hours, ...item.hours])
      );
      mergedMap.set(item.date, { date: item.date, hours: uniqueHours });
    } else {
      mergedMap.set(item.date, { date: item.date, hours: item.hours });
    }
  }

  return Array.from(mergedMap.values());
};
