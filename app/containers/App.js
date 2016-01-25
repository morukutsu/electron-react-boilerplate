import React, { Component, PropTypes } from 'react';
import GL                              from 'gl-react';
import { Surface }                     from 'gl-react-dom'; // in React DOM context

const shaders = GL.Shaders.create({
    helloGL: {
        frag: `
        precision highp float;
        varying vec2 uv;
        uniform float blue;
        void main () {
            gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
        }`
    }
});

export default class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <div>
                <Surface width={511} height={341}>
                    <GL.Node
                        shader={shaders.helloGL}
                        uniforms={{blue: 1.0}}
                    />
                </Surface>

                {
                    (() => {
                        if (process.env.NODE_ENV !== 'production') {
                            const DevTools = require('./DevTools');
                            return <DevTools />;
                        }
                    })()
                }
            </div>
        );
    }
}
