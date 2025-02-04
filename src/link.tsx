import React from "react";
import { Pathname, QueryString, QueryStringExists, UrlParams } from "./types";
import { mergeUrlEntities } from "./utils";
import { useHref, useNavigation } from "./brouther";

const isLeftClick = (e: React.MouseEvent) => e.button === 0;

const isMod = (event: React.MouseEvent): boolean => event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

export type LinkProps<Path extends string> = Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    "href"
> & {
    href: Path;
    replace?: boolean;
} & (UrlParams<Pathname<Path>> extends null
        ? { paths?: undefined }
        : {
              paths: UrlParams<Pathname<Path>>;
          }) &
    (QueryStringExists<Path> extends false
        ? { query?: undefined }
        : {
              query: QueryString<Path>;
          });

export const Link = <Props extends string>({ href, replace = false, onClick, query, paths, ...props }: LinkProps<Props>) => {
    const { push, replace: _replace } = useNavigation();
    const contextHref = useHref();
    const _href = mergeUrlEntities(href, paths, query);

    const _onClick: NonNullable<typeof onClick> = (event) => {
        if (props.target === undefined && props.target !== "_self") event.preventDefault();
        if (_href === contextHref) return;
        if (!isLeftClick(event)) return;
        if (isMod(event)) return;
        onClick?.(event);
        return replace ? _replace(_href) : push(_href);
    };

    return <a {...props} href={_href} onClick={_onClick} />;
};
