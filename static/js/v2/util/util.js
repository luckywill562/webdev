import { convertToRaw } from 'draft-js'
import Cookies from "js-cookie";
import React from 'react';
function trim(text) {
    return text.trim();
}
function options() {
    return {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
}

const month = [{ 'id': 1, 'name': 'janvier' }, { 'id': 2, 'name': 'fevrier' },
{ 'id': 3, 'name': 'Mars' }, { 'id': 4, 'name': 'avril' }, { 'id': 5, 'name': 'mai' },
{ 'id': 7, 'name': 'Juin' }, { 'id': 8, 'name': 'Aout' }, { 'id': 9, 'name': 'septembre' },
{ 'id': 10, 'name': 'octobre' }, { 'id': 11, 'name': 'novembre' }, { 'id': 12, 'name': 'Decembre' }
];
const UploadOptions = {
    fileaccepted: "jpg,jpeg,png,mp4",
    min_size: 24,
    max_size: (1024 * 1024 * 100),
}
const EditorContent = (content) => {
    var arr = convertToRaw(content.getCurrentContent()).blocks;
    var text = '';
    for (let i = 0; i < arr.length; i++) {
        text += arr[i].text + '\n';
    }
    return text
}
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
const insertText = (text) => {
    return emojione.toImage(escapeHtml(text))
}
const toEmoji = (text) => {
    return emojione.shortnameToImage(emojione.unicodeToImage(text));
}
function isEmpty(object) {
    return Object.keys(object).length === 0
}
const Fetch = async (method, url, data, result, erreur) => {
    await fetch(url, {
        method: method,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Bearer ' + Cookies.get('security_token')
        },
        body: data
    }).then(res => res.json())
        .then(result)
        .catch(erreur);
}
function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = React.useState(false);

    const observer = React.useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting),
            ),
        [],
    );

    React.useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}
export { trim, options, month, UploadOptions, EditorContent, insertText, toEmoji, escapeHtml, isEmpty, Fetch,useIsInViewport }