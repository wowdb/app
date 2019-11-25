import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img } from '../lib'
import { colors, fonts, fontWeights, layout, quality } from '../styles'
import { FactionSearchResult, IconType } from '../types'
import { Icon } from './icon'

const Base: FunctionComponent = ({ children }) => (
  <View style={styles.main}>{children}</View>
)

interface BaseWithIconProps {
  icon: string
  type?: IconType
}

const BaseWithIcon: FunctionComponent<BaseWithIconProps> = ({
  children,
  icon,
  type = 'default'
}) => (
  <View style={styles.main}>
    <Icon style={styles.image} icon={icon} type={type} />
    {children}
  </View>
)

interface BaseWithFactionProps {
  alliance: FactionSearchResult
  horde: FactionSearchResult
}

const BaseWithFaction: FunctionComponent<BaseWithFactionProps> = ({
  alliance,
  horde
}) => (
  <>
    <View style={styles.main}>
      <Icon style={styles.image} icon={alliance.icon} type="follower" />
      <View style={styles.details}>
        <Text style={styles.name}>{alliance.name}</Text>
      </View>
      <View style={styles.aside}>
        <Image
          style={styles.faction}
          resizeMode="contain"
          source={{
            uri: img.getUri('faction', 'alliance')
          }}
        />
      </View>
    </View>
    <View style={styles.main}>
      <Icon style={styles.image} icon={horde.icon} type="follower" />
      <View style={styles.details}>
        <Text style={styles.name}>{horde.name}</Text>
      </View>
      <View style={styles.aside}>
        <Image
          style={styles.faction}
          source={{
            uri: img.getUri('faction', 'horde')
          }}
        />
      </View>
    </View>
  </>
)

interface Props {
  data: any
  type: string
}

export const Result: FunctionComponent<Props> = ({ data, type }) => {
  switch (type) {
    case 'abilities':
    case 'artifact-traits':
    case 'battle-pet-abilities':
    case 'glyphs':
    case 'mounts':
    case 'npc-abilities':
    case 'skills':
    case 'specialization-abilities':
    case 'uncategorized-spells':
      return (
        <BaseWithIcon icon={data.icon}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        </BaseWithIcon>
      )

    case 'achievements':
    case 'items':
    case 'talents':
      return (
        <BaseWithIcon icon={data.icon}>
          <View style={styles.details}>
            <Text
              style={[
                styles.name,
                {
                  color: quality(data.quality)
                }
              ]}>
              {data.name}
            </Text>
            {!!data.description && (
              <Text style={styles.description}>{data.description}</Text>
            )}
          </View>
          {(data.points || data.level) > 0 && (
            <View style={styles.aside}>
              <Text style={styles.points}>{data.points || data.level}</Text>
            </View>
          )}
        </BaseWithIcon>
      )

    case 'battle-pets':
    case 'factions':
    case 'npcs':
    case 'objects':
    case 'storyline':
    case 'titles':
    case 'zones':
      return (
        <Base>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        </Base>
      )

    case 'champions':
      return (
        <BaseWithIcon icon={data.portraithorde} type="follower">
          <View style={styles.details}>
            <Text style={styles.name}>{data.namehorde}</Text>
          </View>
        </BaseWithIcon>
      )

    case 'currencies':
    case 'mission-abilities':
    case 'threats':
      return (
        <BaseWithIcon icon={data.icon}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            {!!data.description && (
              <Text style={styles.description}>{data.description}</Text>
            )}
          </View>
        </BaseWithIcon>
      )

    case 'followers':
      return (
        <BaseWithFaction
          alliance={{
            icon: data.portraitalliance,
            name: data.namealliance
          }}
          horde={{
            icon: data.portraithorde,
            name: data.namehorde
          }}
        />
      )

    case 'item-sets':
    case 'transmog-sets':
      return (
        <Base>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.pieces}>
              {data.pieces.map(({ icon }: { icon: string }, index: number) => (
                <Icon
                  style={styles.piece}
                  key={index}
                  icon={icon}
                  type="default"
                />
              ))}
            </View>
          </View>
        </Base>
      )

    case 'missions':
    case 'quests':
      return (
        <Base>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            {!!data.description && (
              <Text style={styles.description}>{data.description}</Text>
            )}
          </View>
        </Base>
      )

    case 'professions':
      return (
        <Base>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            {data.reagents && (
              <View style={styles.pieces}>
                {data.reagents.map(
                  (
                    { icon, quantity }: { icon: string; quantity: number },
                    index: number
                  ) => (
                    <Icon
                      key={index}
                      style={styles.piece}
                      icon={icon}
                      quantity={quantity}
                      type="default"
                    />
                  )
                )}
              </View>
            )}
          </View>
        </Base>
      )

    default:
      return (
        <Base>
          <View style={styles.details}>
            <Text style={styles.description}>
              {JSON.stringify(data, null, 2)}
            </Text>
          </View>
        </Base>
      )
  }
}

const styles = StyleSheet.create({
  aside: {
    justifyContent: 'center',
    marginLeft: layout.margin
  },
  description: {
    ...fonts.body,
    color: colors.white,
    marginTop: layout.padding
  },
  details: {
    flex: 1,
    justifyContent: 'center'
  },
  faction: {
    height: 15,
    width: 15
  },
  image: {
    marginRight: layout.margin
  },
  main: {
    flexDirection: 'row',
    padding: layout.margin
  },
  name: {
    ...fonts.body,
    ...fontWeights.semibold,
    color: colors.accent
  },
  piece: {
    margin: layout.padding
  },
  pieces: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -layout.padding,
    marginHorizontal: -layout.padding,
    marginTop: layout.padding
  },
  points: {
    ...fonts.body,
    color: colors.gray
  }
})
