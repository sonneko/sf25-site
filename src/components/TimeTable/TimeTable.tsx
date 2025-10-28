import React from 'react';
import styles from './TimeTable.module.scss';
import type { EventData, TimetableProps } from './types';

/**
 * [時, 分]のタプルを分に変換するヘルパー関数
 * @param time - [時, 分]のタプル
 * @returns 00:00からの経過分数
 */
const timeToMinutes = (time: [number, number]): number => {
  return time[0] * 60 + time[1];
};

/**
 * 分を HH:MM 形式の文字列に変換するヘルパー関数
 * @param minutes - 00:00からの経過分数
 * @returns HH:MM 形式の文字列
 */
const minutesToDisplayTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * タイムテーブルのイベントブロックを描画するReactコンポーネント。
 *
 * @param props - TimetableProps
 * @returns タイムテーブルのReact要素
 */
export const Timetable = ({
  events,
  tableStartTime,
  tableEndTime,
  pixelPer30Minutes = 60,
}: TimetableProps) => {
  const START_MINUTES = timeToMinutes(tableStartTime);
  const END_MINUTES = timeToMinutes(tableEndTime);
  const TOTAL_DURATION_MINUTES = END_MINUTES - START_MINUTES;
  const TOTAL_HEIGHT = (TOTAL_DURATION_MINUTES / 30) * pixelPer30Minutes;

  /**
   * イベントデータから、そのブロックの top と height スタイルを計算する関数
   * @param event - EventData オブジェクト
   * @returns スタイルオブジェクト
   */
  const calculateEventStyles = (event: EventData): React.CSSProperties => {
    const eventStartMinutes = timeToMinutes(event.startTime);
    const eventEndMinutes = timeToMinutes(event.endTime);

    const offsetMinutes = eventStartMinutes - START_MINUTES;
    const durationMinutes = eventEndMinutes - eventStartMinutes;

    const top = (offsetMinutes / 30) * pixelPer30Minutes;

    const height = (durationMinutes / 30) * pixelPer30Minutes;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  /**
   * タイムマーカーのリストを生成する関数
   */
  const renderTimeMarkers = () => {
    const markers = [];
    let currentMinutes = START_MINUTES;

    while (currentMinutes <= END_MINUTES) {
      markers.push(
        <div key={currentMinutes} className={styles.timeMarker}>
          {minutesToDisplayTime(currentMinutes)}
        </div>
      );
      currentMinutes += 30;
    }
    return markers;
  };

  /**
   * 指定されたステージのイベントブロックをレンダリングする関数
   */
  const renderStageEvents = (stage: 'music' | 'gym1') => {
    return events
      .filter(event => event.stage === stage)
      .map(event => {
        const positionStyles = calculateEventStyles(event);

        const colorClassName = `color${event.color.charAt(0).toUpperCase()}${event.color.slice(1)}`;
        const colorClass =
          styles[colorClassName as keyof typeof styles] || styles.colorBlue;

        const displayTime = `${minutesToDisplayTime(timeToMinutes(event.startTime))} - ${minutesToDisplayTime(timeToMinutes(event.endTime))}`;

        return (
          <a
            key={event.id}
            className={`${styles.eventBlock} ${colorClass}`}
            style={positionStyles}
            title={`${event.name} (${displayTime})`}
            href={`/booth/${event.id.split('_')[0]}`}
          >
            <div className={styles.eventTitle}>{event.name}</div>
            <div className={styles.eventTime}>{displayTime}</div>
            <img
              className={styles.eventIcon}
              src={`booths-icon/${event.id.split('_')[0]}.png`}
              width={positionStyles.height}
            />
          </a>
        );
      });
  };

  return (
    <div
      className={styles.timetableContainer}
      style={
        { '--marker-height': `${pixelPer30Minutes}px` } as React.CSSProperties
      }
    >
      <div className={styles.timeAxis}>{renderTimeMarkers()}</div>

      <div className={styles.stageSchedule}>
        {/* 講堂 */}
        <div className={styles.stage}>
          <div className={styles.stageHeader}>講堂</div>
          <div
            className={styles.eventGrid}
            style={{ height: `${TOTAL_HEIGHT}px` }}
          >
            {renderStageEvents('gym1')}
          </div>
        </div>

        {/* 音楽室 */}
        <div className={styles.stage}>
          <div className={styles.stageHeader}>音楽室</div>
          <div
            className={styles.eventGrid}
            style={{ height: `${TOTAL_HEIGHT}px` }}
          >
            {renderStageEvents('music')}
          </div>
        </div>
      </div>
    </div>
  );
};
