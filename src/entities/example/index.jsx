import React, { useCallback } from "react";
import clsx from "clsx";
// eslint-disable-next-line import/no-unresolved
import Image from "@theme/IdealImage";
import { ga } from "@site/src/shared/lib/ga";
import { date } from "@site/src/shared/lib/date";
import styles from "./styles.module.scss";

export function ExampleCard({ className, data }) {
    const isNew = date.getDiffDays(new Date(data.updatedAt), new Date()) <= 14;
    const handleWebsiteClick = useCallback(() => {
        ga.sendEvent({
            category: ga.CATEGORIES.full,
            action: "Example:Click",
            label: `${data.title} [website]`,
        });
    }, []);
    const handleSourceClick = useCallback(() => {
        ga.sendEvent({
            category: ga.CATEGORIES.full,
            action: "Example:Click",
            label: `${data.title} [source]`,
        });
    }, []);

    return (
        <article className={clsx("card", styles.root, className)}>
            <div className={clsx("card__image", styles.preview)}>
                <div className={clsx(styles.ribbon)}>{data.version}</div>
                <Image img={data.preview} alt={data.title} />
            </div>
            <div className={clsx("card__body", styles.content)}>
                {isNew && (
                    <span title="Was updated less than 2 weeks ago" className={styles.labelNew}>
                        NEW:{" "}
                    </span>
                )}
                <span className={styles.title}>{data.title}</span>
                <p className={styles.description}>{data.description}</p>
            </div>
            <div className={clsx("card__footer", styles.actions)}>
                <div className="button-group button-group--block">
                    {data.website && (
                        <a
                            className="button button--small button--secondary button--block"
                            href={data.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={handleWebsiteClick}
                        >
                            Website
                        </a>
                    )}
                    {data.source && (
                        <a
                            className="button button--small button--secondary button--block"
                            href={data.source}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={handleSourceClick}
                        >
                            Source
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
