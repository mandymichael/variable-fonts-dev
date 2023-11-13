import PostStyles from '../styles/PostContent.module.css';
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function PostContent({postContent}) {
    console.log(postContent)
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
                }}
            >
                {postContent.content}
            </ReactMarkdown>
       </div>   
    )
}

