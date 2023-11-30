import PostStyles from '../styles/PostContent.module.css';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import Image from 'next/image'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function PostContent({postContent}) {
    return (
       <div className={`${PostStyles.container} PostContent`}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]} 
                children={postContent.content}
                components={{
                    code(props) {
                        const {children, className, node, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            children={String(children).replace(/\n$/, '')}
                            style={materialDark}
                            language={match[1]}
                            PreTag="div"
                        />
                        ) : (
                        <code {...rest} className={PostStyles.inlineCode}>
                            {children}
                        </code>
                        )
                    },
                    p: paragraph => {
                        const { node } = paragraph

                          if (node.children[0].tagName === "img") {
                            const image = node.children[0]
                            const metastring = image.properties.alt
                            const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
                            const metaWidth = metastring.match(/{([^}]+)x/)
                            const metaHeight = metastring.match(/\dx([^}]+)}/)
                            const width = metaWidth ? metaWidth[1] : "621"
                            const height = metaHeight ? metaHeight[1] : "123"
                            const isPriority = metastring?.toLowerCase().match('{priority}')
                            
                            return (
                              <div className="imageContainer">
                                <Image
                                  src={image.properties.src}
                                  width={width}
                                  height={height}
                                  alt={image.properties.alt}
                                  loading="lazy"
                                  priority={isPriority}
                                />
                              </div>
                            )
                          }

                        return <p className={node.properties.className && node.properties.className}>{paragraph.children}</p>
                      },
                }}
            >
                {postContent.content}
            </ReactMarkdown>
       </div>   
    )
}

