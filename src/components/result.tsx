import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img } from '../lib'
import { colors, fonts, fontWeights, layout, quality } from '../styles'
import { FactionSearchResult, IconType, WowheadResult } from '../types'
import { Icon } from './icon'
import { Touchable } from './touchable'

interface BaseProps {
  onPress: () => void
}

const Base: FunctionComponent<BaseProps> = ({ children, onPress }) => (
  <Touchable style={styles.main} onPress={onPress}>
    {children}
  </Touchable>
)

interface BaseWithIconProps {
  icon: string
  type?: IconType

  onPress: () => void
}

const BaseWithIcon: FunctionComponent<BaseWithIconProps> = ({
  children,
  icon,
  type = 'default',
  onPress
}) => (
  <Touchable style={styles.main} onPress={onPress}>
    <Icon style={styles.image} icon={icon} type={type} />
    {children}
  </Touchable>
)

interface BaseWithFactionProps {
  alliance: FactionSearchResult
  horde: FactionSearchResult

  onPress: () => void
}

const BaseWithFaction: FunctionComponent<BaseWithFactionProps> = ({
  alliance,
  horde,
  onPress
}) => (
  <Touchable onPress={onPress}>
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
  </Touchable>
)

interface Props {
  data: WowheadResult
  type: string

  onPress: () => void
}

export const Result: FunctionComponent<Props> = ({ data, type, onPress }) => {
  switch (type) {
    case 'abilities':
    case 'artifact-traits':
    case 'azerite-essence-power':
    case 'azerite-essence':
    case 'battle-pet-abilities':
    case 'glyphs':
    case 'mounts':
    case 'npc-abilities':
    case 'skills':
    case 'specialization-abilities':
    case 'uncategorized-spells':
      return (
        <BaseWithIcon icon={data.icon} onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        </BaseWithIcon>
      )

    case 'achievements':
    case 'items':
    case 'talents':
      return (
        <BaseWithIcon icon={data.icon} onPress={onPress}>
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
        <Base onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
          </View>
        </Base>
      )

    case 'champions':
      return (
        <BaseWithIcon
          icon={data.portraithorde}
          type="follower"
          onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.namehorde}</Text>
          </View>
        </BaseWithIcon>
      )

    case 'currencies':
    case 'events':
    case 'mission-abilities':
    case 'threats':
      return (
        <BaseWithIcon icon={data.icon} onPress={onPress}>
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
          onPress={onPress}
        />
      )

    case 'item-sets':
    case 'transmog-sets':
      return (
        <Base onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            {data.pieces && (
              <View style={styles.pieces}>
                {data.pieces.map(({ icon }, index) => (
                  <Icon
                    style={styles.piece}
                    key={index}
                    icon={icon}
                    type="default"
                  />
                ))}
              </View>
            )}
          </View>
        </Base>
      )

    case 'missions':
    case 'quests':
      return (
        <Base onPress={onPress}>
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
        <Base onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.name}>{data.name}</Text>
            {data.reagents && (
              <View style={styles.pieces}>
                {data.reagents.map(({ icon, quantity }, index) => (
                  <Icon
                    key={index}
                    style={styles.piece}
                    icon={icon}
                    quantity={quantity}
                    type="default"
                  />
                ))}
              </View>
            )}
          </View>
        </Base>
      )

    default:
      if (__DEV__) {
        return (
          <Base onPress={onPress}>
            <View style={styles.details}>
              <Text>{JSON.stringify(data, null, 2)}</Text>
            </View>
          </Base>
        )
      }

      return null
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
