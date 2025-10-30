'use client';

import React, { useState } from 'react';
import styles from './TimeTable.module.scss';
import type { EventData, TimetableProps } from './types';

/**
 * @param time
 * @returns
 */
const timeToMinutes = (time: [number, number]): number => {
  return time[0] * 60 + time[1];
};

/**
 * @param minutes
 * @returns
 */
const minutesToDisplayTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * @param props
 * @returns
 */
export default function Timetable({
  events,
  tableStartTime,
  tableEndTime,
  pixelPer30Minutes = 60,
}: TimetableProps) {
  type StageKey = 'gym1' | 'music';
  const [selectedStage, setSelectedStage] = useState<StageKey>('gym1'); // 初期値は「講堂」

  const stageLabels: { [key in StageKey]: string } = {
    gym1: '講堂',
    music: '音楽室',
  };

  const START_MINUTES = timeToMinutes(tableStartTime);
  const END_MINUTES = timeToMinutes(tableEndTime);
  const TOTAL_DURATION_MINUTES = END_MINUTES - START_MINUTES;
  const TOTAL_HEIGHT = (TOTAL_DURATION_MINUTES / 30) * pixelPer30Minutes;

  /**
   * @param event
   returns
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

  const renderStageEvents = (stage: StageKey) => {
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
      <div className={styles.stageTabs}>
        {(Object.keys(stageLabels) as StageKey[]).map(stageKey => (
          <button
            key={stageKey}
            className={`${styles.tabButton} ${
              selectedStage === stageKey ? styles.activeTab : ''
            }`}
            onClick={() => setSelectedStage(stageKey)}
          >
            {stageLabels[stageKey]}
          </button>
        ))}
      </div>

      <div className={styles.timetableContent}>
        <div className={styles.timeAxis}>{renderTimeMarkers()}</div>

        <div className={styles.stageSchedule}>
          <div className={styles.stage}>
            <div className={styles.stageHeader}>
              {stageLabels[selectedStage]}
            </div>
            <div
              className={styles.eventGrid}
              style={{ height: `${TOTAL_HEIGHT}px` }}
            >
              {renderStageEvents(selectedStage)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
