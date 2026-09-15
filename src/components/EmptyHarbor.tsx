type Props = {
  title: string
  body: string
  showVideo?: boolean
}

export function EmptyHarbor({ title, body, showVideo }: Props) {
  return (
    <div className="empty-harbor" data-testid="empty-harbor">
      <div className="empty-harbor-media">
        {showVideo ? (
          <video
            className="empty-harbor-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/imagine/empty-tide-desk.jpg"
            aria-hidden="true"
          >
            <source src="/motion/tide-desk-drift.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/imagine/empty-tide-desk.jpg"
            alt=""
            className="empty-harbor-img"
            width={768}
            height={512}
          />
        )}
      </div>
      <div className="empty-harbor-copy">
        <p className="empty-harbor-title">{title}</p>
        <p className="empty-harbor-body">{body}</p>
      </div>
    </div>
  )
}
