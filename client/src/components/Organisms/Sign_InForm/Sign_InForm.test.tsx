import TestRenderer from 'react-test-renderer';
import React from "react";

function Link(props: any) {
    return (<a href={props.page}>{props.children}</a>);
}

test('component', () => {
    const tree = TestRenderer.create(
        <Link page="https://www.facebook.com/">Facebook</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

