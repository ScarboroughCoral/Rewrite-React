// Step I: The createElement Function
const createTextElement = (text: string) => {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
const createElement = <T extends XElementType>(type: XElementTypeMap[T]['type'], props: XElementTypeMap[T]['props'], ...children: XElementTypeMap[T]['children']) => {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => typeof child === 'object' ? child : createTextElement(child))
        }
    }
}
enum XElementType {
    Text,
    Element
}
type XElementTypeMap = {
    [XElementType.Element]: {
        type: keyof HTMLElementTagNameMap,
        props: {
            [key: string]: unknown
            children: XElementTypeMap[XElementType.Element]['children']
        }
        children: Array<XElement<XElementType.Element| XElementType.Text>>
    }
    [XElementType.Text]: {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: string,
            children: XElementTypeMap[XElementType.Text]['children']
        }
        children: []
    }
}

type XElement<T extends XElementType> = {
    type: XElementTypeMap[T]['type']
    props: XElementTypeMap[T]['props']
}

// Step II: The render Function
const render = <T extends XElementType>(element: XElement<T>, container: Node | null) => {
    const dom = element.type === 'TEXT_ELEMENT'
        ? document.createTextNode("")
        : document.createElement(element.type)
    const isProperty = (key: string) => key !== 'children'
    Object.keys(element.props)
        .filter(isProperty)
        .forEach((name) => {
            // @ts-ignore
            dom[name] = element.props[name]
        })
    element.props.children.forEach((child) => {
        render(child, dom)
    })
    container?.appendChild(dom)
}



// Step III: Concurrent Mode
// Step IV: Fibers
// Step V: Render and Commit Phases
// Step VI: Reconciliation
// Step VII: Function Components
// Step VIII: Hooks


export const X = {
    createElement,
    render
}