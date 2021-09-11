import { isFunction } from 'lodash';
import { VNode } from 'preact'

export function isVNode(node: any): node is VNode {
    return typeof node === 'object' && node.type && node.props;
}

export function findNode(node: VNode, predicate: (node: VNode) => boolean): VNode | undefined {
    if (predicate(node)) {
        return node;
    }

    const children = Array.isArray(node.props.children)
        ? node.props.children : [node.props.children];

    for (let i = 0; i< children.length; i++) {
        const node = children[i];
        if (isVNode(node)) {
            const found = findNode(node, predicate);
            if (found) {
                return found;
            }
        }
    }

    return undefined;
}

export function findNodeByFunctionName(node: VNode, name: string) {
    return findNode(node, (n) => isFunction(n.type) && n.type.name === name);
}

export function hasProp(node: VNode, prop: string) {
    return !!findNode(node, (n) => prop in n.props);
}
