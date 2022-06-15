import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1>Hello World!</h1>
            <p>
                This is docs for
                &nbsp;
                <Link href="https://github.com/terwer/node-metaweblog-api-adaptor">
                    <a style={{color: "blue"}}
                       rel="noreferrer"
                       target="_blank">
                        node-metaweblog-api-adaptor
                    </a>
                </Link>
            </p>
        </div>
    )
}